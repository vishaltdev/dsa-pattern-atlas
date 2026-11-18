"""Refresh feed discovery; never manufacture AI analysis from RSS metadata."""
import concurrent.futures, datetime, hashlib, json, pathlib, re, urllib.request, xml.etree.ElementTree as ET
ROOT=pathlib.Path(__file__).parent
FEEDS=[
('Netflix','https://netflixtechblog.com/feed','Distributed systems','Large-scale platforms and data infrastructure'),
('Uber','https://www.uber.com/blog/engineering/rss/','Distributed systems','Storage, messaging and infrastructure trade-offs'),
('Cloudflare','https://blog.cloudflare.com/rss/','Reliability','Edge systems, networking and public postmortems'),
('AWS','https://aws.amazon.com/blogs/architecture/feed/','Cloud architecture','Architecture patterns and cloud operations'),
('Google','https://research.google/blog/rss/','Distributed systems','Research foundations and system mechanisms'),
('Meta','https://engineering.fb.com/feed/','Storage','Storage, infrastructure and efficiency'),
('LinkedIn','https://www.linkedin.com/blog/engineering/feed','Messaging','Streaming and data infrastructure'),
('Spring','https://spring.io/blog.atom','Java / Spring','Java and Spring application engineering'),
('Confluent','https://www.confluent.io/blog/feed/','Messaging','Kafka, streaming and event delivery semantics'),
('Redis','https://redis.io/blog/feed/','Caching','Cache behavior and data structures'),
('Cockroach Labs','https://www.cockroachlabs.com/blog/index.xml','Databases','Distributed SQL and transaction behavior'),
('GitHub','https://github.blog/engineering/feed/','Reliability','Engineering operations and developer infrastructure'),
('Stripe','https://stripe.com/blog/feed.rss','APIs','Payment APIs and safe mutations')]
TERMS={'Caching':['cache','redis','invalidation'],'Messaging':['kafka','stream','event','queue'],'Databases':['database','sql','storage','transaction','replication'],'Reliability':['outage','reliab','incident','retry','latency','observability'],'Java / Spring':['java','spring','jvm'],'Security':['auth','security','identity','consent'],'Cloud migration':['migration','cloud','kubernetes'],'Distributed systems':['distributed','scal','partition','consistency']}
def text(e,key):
 for child in e.iter():
  if child.tag.split('}')[-1]==key:return ''.join(child.itertext()).strip()
 return ''
def collect(f):
 company,url,area,why=f
 feed=dict(company=company,url=url,area=area,why=why,checked=datetime.datetime.now(datetime.timezone.utc).isoformat())
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'StaffStudyAtlas/1.0 RSS reader'})
  with urllib.request.urlopen(req,timeout=18) as r: raw=r.read(5_000_000)
  root=ET.fromstring(raw)
  entries=[e for e in root.iter() if e.tag.split('}')[-1] in ('item','entry')]
  if not entries:raise ValueError('No RSS/Atom entries')
  result=[]
  for e in entries[:30]:
   title=text(e,'title'); link=text(e,'link')
   if not link:
    for c in e:
     if c.tag.split('}')[-1]=='link' and c.attrib.get('rel','alternate')=='alternate':link=c.attrib.get('href','');break
   if not link.startswith(('https://','http://')):continue
   concepts=[k for k,v in TERMS.items() if any(t in title.lower() for t in v)]
   # Transparent keyword discovery score; not a claim of editorial importance.
   score=2*len(concepts)+3*any(t in title.lower() for t in ('deep dive','lessons','outage','scaling','design','architecture','internals'))
   result.append(dict(id=hashlib.sha256(link.encode()).hexdigest()[:12],title=title,url=link,company=company,concepts=concepts or [area],date=text(e,'pubDate') or text(e,'published') or text(e,'updated'),score=score,scope='Feed metadata only',status='Not analyzed',technologies=[t for t in ['Java','Spring','Kafka','Redis','SQL','Git','Kubernetes','HTTP'] if t.lower() in title.lower()]))
  feed.update(status='Verified RSS/Atom',count=len(result))
  return feed,result
 except Exception as ex:
  feed.update(status='Unavailable on last check',count=0,error=type(ex).__name__)
  return feed,[]
def main():
 with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool: rows=list(pool.map(collect,FEEDS))
 feeds=[r[0] for r in rows]; articles=sorted([a for r in rows for a in r[1]],key=lambda a:-a['score'])
 # Round-robin company mix for default discovery, retain per-company depth.
 (ROOT/'feeds.json').write_text(json.dumps(dict(updated=datetime.datetime.now(datetime.timezone.utc).isoformat(),feeds=feeds,articles=articles),ensure_ascii=False,indent=2))
 print([(f['company'],f['status'],f['count']) for f in feeds])
if __name__=='__main__':main()
