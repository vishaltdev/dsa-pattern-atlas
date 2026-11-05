"""Deterministic, instrumented reference algorithms for the 30 teaching labs.

Each recorded state is AFTER the named instruction. Conditions are recorded too.
The browser replays immutable snapshots; it does not execute arbitrary Java.
"""
import copy
import heapq
import json
from collections import deque


class Lab:
    def __init__(self, number, title, inputs, code):
        self.id = number
        self.title = title
        self.inputs = copy.deepcopy(inputs)
        self.code = code.split('|')
        self.steps = []

    def step(self, line, variables, structures=None, note=''):
        assert 0 <= line < len(self.code)
        self.steps.append(copy.deepcopy(dict(line=line, variables=variables,
                                            structures=structures or {}, note=note)))

    def finish(self, result, expected):
        assert result == expected, (self.id, result, expected)
        self.result = result
        self.expected = expected
        return self


def sliding(s='abcabcbb'):
    l=Lab(1,'Longest substring without repeated characters',{'s':s},
          'left = 0; best = 0; seen = new HashSet<>();|right = 0;|right < s.length()|seen.contains(s.charAt(right))|seen.remove(s.charAt(left));|left++;|seen.add(s.charAt(right));|best = Math.max(best, right - left + 1);|right++;|return best;')
    left=best=0;seen=[];right=0
    def snap(i,n=''): l.step(i,dict(left=left,right=right,best=best),{'characters':list(s),'seen (HashSet)':seen},n)
    snap(0);snap(1)
    while True:
        snap(2,str(right<len(s)).lower())
        if right>=len(s): break
        while True:
            duplicate=s[right] in seen;snap(3,str(duplicate).lower())
            if not duplicate:break
            seen.remove(s[left]);snap(4,'Remove the character, not its index.')
            left+=1;snap(5)
        seen.append(s[right]);snap(6)
        best=max(best,right-left+1);snap(7,'Only measure the window after it is valid.')
        right+=1;snap(8)
    snap(9);return l.finish(best,max((len(s[i:j]) for i in range(len(s)+1) for j in range(i,len(s)+1) if len(set(s[i:j]))==j-i),default=0))


def two_pointers():
    a=[2,7,11,15];target=9;left=0;right=3;result=[]
    l=Lab(2,'Sorted pair sum',{'a':a,'target':target},'left = 0; right = a.length - 1;|left < right|sum = a[left] + a[right];|sum == target|sum < target|left++;|right--;|return new int[]{left + 1, right + 1};')
    v={'left':left,'right':right,'target':target};l.step(0,v,{'a':a})
    while left<right:
        l.step(1,v,{'a':a},'true');total=a[left]+a[right];v={**v,'sum':total};l.step(2,v,{'a':a})
        l.step(3,v,{'a':a},str(total==target).lower())
        if total==target:result=[left+1,right+1];l.step(7,{**v,'result':result},{'a':a});break
        l.step(4,v,{'a':a},str(total<target).lower())
        if total<target:left+=1;line=5
        else:right-=1;line=6
        v={**v,'left':left,'right':right};l.step(line,v,{'a':a})
    return l.finish(result,[1,2])


def fast_slow():
    links={'A':'B','B':'C','C':'B'};slow=fast='A'
    l=Lab(3,'Cycle detection with two walkers',{'head':'A','next':links},'slow = head; fast = head;|fast != null && fast.next != null|slow = slow.next;|fast = fast.next.next;|slow == fast|return true;')
    def snap(i,n=''):l.step(i,dict(slow=slow,fast=fast),{'next pointers':links},n)
    snap(0)
    while True:
        snap(1,'true');slow=links[slow];snap(2);fast=links[links[fast]];snap(3)
        snap(4,str(slow==fast).lower())
        if slow==fast:snap(5,'Reference identity matches: a cycle exists.');break
    return l.finish(True,True)


def binary():
    a=[1,3,5,7,9];lo=0;hi=4;mid=None;target=7
    l=Lab(4,'Binary search for a target',{'a':a,'target':target},'lo = 0; hi = a.length - 1;|lo <= hi|mid = lo + (hi - lo) / 2;|a[mid] == target|a[mid] < target|lo = mid + 1;|hi = mid - 1;|return mid;')
    def snap(i,n=''):l.step(i,dict(lo=lo,hi=hi,mid=mid,target=target),{'a':a},n)
    snap(0)
    while lo<=hi:
        snap(1,'true');mid=(lo+hi)//2;snap(2);snap(3,str(a[mid]==target).lower())
        if a[mid]==target:snap(7);return l.finish(mid,3)
        snap(4,str(a[mid]<target).lower())
        if a[mid]<target:lo=mid+1;snap(5)
        else:hi=mid-1;snap(6)


def answer_search():
    piles=[3,6,7,11];h=8;lo=1;hi=11;mid=None;hours=0;pile=None
    l=Lab(5,'Minimum eating speed',{'piles':piles,'h':h},'lo = 1; hi = max(piles);|lo < hi|mid = lo + (hi - lo) / 2;|hours = 0;|pile = next pile;|hours += (pile + mid - 1) / mid;|hours <= h|hi = mid;|lo = mid + 1;|return lo;')
    def snap(i,n=''):l.step(i,dict(lo=lo,hi=hi,mid=mid,hours=hours,pile=pile,h=h),{'piles':piles},n)
    snap(0)
    while lo<hi:
        snap(1,'true');mid=(lo+hi)//2;snap(2);hours=0;snap(3)
        for pile in piles:snap(4);hours+=(pile+mid-1)//mid;snap(5)
        snap(6,str(hours<=h).lower())
        if hours<=h:hi=mid;snap(7)
        else:lo=mid+1;snap(8)
    snap(1,'false');snap(9);return l.finish(lo,4)


def frequency():
    s='aabc';freq={};i=0;c=None
    l=Lab(6,'Character frequency counting',{'s':s},'frequency = new HashMap<>();|i < s.length()|c = s.charAt(i);|frequency.put(c, frequency.getOrDefault(c, 0) + 1);|i++;|return frequency;')
    def snap(line,n=''):l.step(line,dict(i=i,c=c),{'characters':list(s),'frequency':freq},n)
    snap(0)
    for index,char in enumerate(s):
        i=index;snap(1,'true');c=char;snap(2);freq[c]=freq.get(c,0)+1;snap(3);i+=1;snap(4)
    snap(1,'false');snap(5);return l.finish(freq,{'a':2,'b':1,'c':1})


def prefix():
    a=[2,4,1,5];prefix=[0]*5;left=1;right=3;i=0
    l=Lab(7,'Immutable range sum',{'a':a,'left':left,'right':right},'prefix = new long[a.length + 1];|i < a.length|prefix[i + 1] = prefix[i] + a[i];|i++;|sum = prefix[right + 1] - prefix[left];|return sum;')
    def snap(line,n='',extra=None):l.step(line,dict(i=i,left=left,right=right,**(extra or {})),{'a':a,'prefix':prefix},n)
    snap(0)
    for i in range(len(a)):snap(1,'true');prefix[i+1]=prefix[i]+a[i];snap(2);i+=1;snap(3)
    snap(1,'false');total=prefix[right+1]-prefix[left];snap(4,extra={'sum':total});snap(5,extra={'sum':total});return l.finish(total,10)


def difference():
    n=5;left=1;right=3;value=3;diff=[0]*6;result=[0]*5;running=0;i=0
    l=Lab(8,'Inclusive range addition',{'n':n,'update':[left,right,value]},'diff = new long[n + 1];|diff[left] += value;|diff[right + 1] -= value;|running = 0;|i < n|running += diff[i];|result[i] = running;|i++;|return result;')
    def snap(line,note=''):l.step(line,dict(left=left,right=right,value=value,i=i,running=running),{'diff':diff,'result':result},note)
    snap(0);diff[left]+=value;snap(1);diff[right+1]-=value;snap(2);snap(3)
    for i in range(n):snap(4,'true');running+=diff[i];snap(5);result[i]=running;snap(6);i+=1;snap(7)
    snap(4,'false');snap(8);return l.finish(result,[0,3,3,3,0])


def mono_stack():
    t=[73,74,75,71];stack=[];answer=[0]*4;i=0;j=None
    l=Lab(9,'Daily temperatures',{'temperatures':t},'stack = new ArrayDeque<>();|i < t.length|!stack.isEmpty() && t[stack.peek()] < t[i]|j = stack.pop();|answer[j] = i - j;|stack.push(i);|i++;|return answer;')
    def snap(line,n=''):l.step(line,dict(i=i,j=j),{'temperatures':t,'stack indices (top at right)':stack,'answer':answer},n)
    snap(0)
    for i in range(len(t)):
        snap(1,'true')
        while True:
            cond=bool(stack and t[stack[-1]]<t[i]);snap(2,str(cond).lower())
            if not cond:break
            j=stack.pop();snap(3);answer[j]=i-j;snap(4)
        stack.append(i);snap(5);i+=1;snap(6)
    snap(1,'false');snap(7);return l.finish(answer,[1,1,0,0])


def mono_queue():
    a=[1,3,-1,-3,5];k=3;dq=deque();answer=[];i=0
    l=Lab(10,'Sliding-window maximum',{'a':a,'k':k},'deque = new ArrayDeque<>();|i < a.length|!deque.isEmpty() && deque.peekFirst() <= i - k|deque.pollFirst();|!deque.isEmpty() && a[deque.peekLast()] <= a[i]|deque.pollLast();|deque.offerLast(i);|i >= k - 1|answer.add(a[deque.peekFirst()]);|i++;|return answer;')
    def snap(line,n=''):l.step(line,dict(i=i,k=k,left=max(0,i-k+1)),{'a':a,'deque indices (front at left)':list(dq),'answer':answer},n)
    snap(0)
    for i in range(len(a)):
        snap(1,'true')
        while True:
            cond=bool(dq and dq[0]<=i-k);snap(2,str(cond).lower())
            if not cond:break
            dq.popleft();snap(3,'Expired index leaves the front.')
        while True:
            cond=bool(dq and a[dq[-1]]<=a[i]);snap(4,str(cond).lower())
            if not cond:break
            dq.pop();snap(5,'A newer, stronger candidate dominates this index.')
        dq.append(i);snap(6);snap(7,str(i>=k-1).lower())
        if i>=k-1:answer.append(a[dq[0]]);snap(8)
        i+=1;snap(9)
    snap(1,'false');snap(10);return l.finish(answer,[3,3,5])


def heap_lab():
    nums=[3,2,1,5,6,4];k=2;heap=[];x=None
    l=Lab(11,'Kth largest using a size-k min heap',{'nums':nums,'k':k},'heap = new PriorityQueue<>();|x = next value;|heap.offer(x);|heap.size() > k|heap.poll();|return heap.element();')
    def snap(line,n=''):l.step(line,dict(x=x,k=k,size=len(heap)),{'nums':nums,'min heap (array layout)':heap},n)
    snap(0)
    for x in nums:
        snap(1);heapq.heappush(heap,x);snap(2);snap(3,str(len(heap)>k).lower())
        if len(heap)>k:heapq.heappop(heap);snap(4,'Discard the smallest retained value.')
    snap(5);return l.finish(heap[0],5)


def intervals():
    ranges=[[8,10],[1,3],[2,6]];merged=[];x=None
    l=Lab(12,'Merge overlapping closed intervals',{'intervals':ranges},'sort intervals by start;|x = next interval;|merged.isEmpty() || last.end < x.start|merged.add(x.clone());|last.end = Math.max(last.end, x.end);|return merged;')
    l.step(0,{'x':x},{'intervals':sorted(ranges),'merged':merged},'Sorted order exposes neighboring overlaps.');ranges.sort()
    for x in ranges:
        l.step(1,{'x':x},{'intervals':ranges,'merged':merged});new=not merged or merged[-1][1]<x[0];l.step(2,{'x':x},{'merged':merged},str(new).lower())
        if new:merged.append(x.copy());line=3
        else:merged[-1][1]=max(merged[-1][1],x[1]);line=4
        l.step(line,{'x':x},{'intervals':ranges,'merged':merged})
    l.step(5,{}, {'merged':merged});return l.finish(merged,[[1,6],[8,10]])


def greedy():
    nums=[2,3,1,1,4];farthest=0;i=0
    l=Lab(13,'Jump Game reachability',{'nums':nums},'farthest = 0;|i < nums.length|i > farthest|return false;|farthest = Math.max(farthest, i + nums[i]);|i++;|return true;')
    def snap(line,n=''):l.step(line,dict(i=i,farthest=farthest),{'nums':nums},n)
    snap(0)
    for i in range(len(nums)):
        snap(1,'true');snap(2,str(i>farthest).lower())
        if i>farthest:snap(3);return l.finish(False,False)
        farthest=max(farthest,i+nums[i]);snap(4);i+=1;snap(5)
    snap(1,'false');snap(6);return l.finish(True,True)


def linked():
    links={'A':'B','B':'C','C':None};prev=None;cur='A';nxt=None
    l=Lab(14,'Reverse a linked list',{'head':'A','next':links},'prev = null; cur = head;|cur != null|next = cur.next;|cur.next = prev;|prev = cur;|cur = next;|return prev;')
    def snap(line,n=''):l.step(line,dict(prev=prev,cur=cur,next=nxt),{'next pointers':links},n)
    snap(0)
    while cur is not None:
        snap(1,'true');nxt=links[cur];snap(2,'Save the suffix before changing the link.');links[cur]=prev;snap(3);prev=cur;snap(4);cur=nxt;snap(5)
    snap(1,'false');snap(6);return l.finish(prev,'C')


TREE={'A':{'value':3,'left':'B','right':'C'},'B':{'value':9,'left':None,'right':None},'C':{'value':20,'left':'D','right':'E'},'D':{'value':15,'left':None,'right':None},'E':{'value':7,'left':None,'right':None}}


def tree_dfs():
    stack=[];returns={}
    l=Lab(15,'Maximum binary-tree depth',{'root':'A','tree':TREE},'enter depth(node);|node == null|return 0;|left = depth(node.left);|right = depth(node.right);|result = 1 + Math.max(left, right);|return result;')
    def snap(line,node,n=''):l.step(line,{'node':node,'depth':len(stack)}, {'tree':TREE,'call stack':stack,'returned depths':returns},n)
    def depth(node):
        stack.append({'node':node,'left':'pending','right':'pending'});snap(0,node);snap(1,node,str(node is None).lower())
        if node is None:snap(2,node);stack.pop();return 0
        left=depth(TREE[node]['left']);stack[-1]['left']=left;snap(3,node,'The child call has returned; resume the parent.')
        right=depth(TREE[node]['right']);stack[-1]['right']=right;snap(4,node)
        result=1+max(left,right);stack[-1]['result']=result;snap(5,node);returns[node]=result;snap(6,node);stack.pop();return result
    result=depth('A');return l.finish(result,3)


def tree_bfs():
    q=deque(['A']);levels=[];level=[];u=None;size=0;i=0
    l=Lab(16,'Binary-tree level order',{'root':'A','tree':TREE},'queue.offer(root);|!queue.isEmpty()|size = queue.size(); level = new ArrayList<>();|i < size|node = queue.poll();|level.add(node.val);|node.left != null|queue.offer(node.left);|node.right != null|queue.offer(node.right);|i++;|levels.add(level);|return levels;')
    def snap(line,n=''):l.step(line,dict(node=u,size=size,i=i),{'tree':TREE,'queue (front at left)':list(q),'current level':level,'levels':levels},n)
    snap(0)
    while q:
        snap(1,'true');size=len(q);level=[];i=0;snap(2)
        for i in range(size):
            snap(3,'true');u=q.popleft();snap(4);level.append(TREE[u]['value']);snap(5)
            for child,condition,action in [('left',6,7),('right',8,9)]:
                snap(condition,str(TREE[u][child] is not None).lower())
                if TREE[u][child] is not None:q.append(TREE[u][child]);snap(action)
            i+=1;snap(10)
        snap(3,'false');levels.append(level.copy());snap(11)
    snap(1,'false');snap(12);return l.finish(levels,[[3],[9,20],[15,7]])


def bst():
    tree={'A':{'value':4,'left':'B','right':'C'},'B':{'value':2,'left':None,'right':None},'C':{'value':7,'left':None,'right':None}};cur='A';target=2
    l=Lab(17,'BST search',{'tree':tree,'target':target},'cur = root;|cur != null && cur.val != target|target < cur.val|cur = cur.left;|cur = cur.right;|return cur;')
    def snap(line,n=''):l.step(line,dict(cur=cur,target=target),{'tree':tree},n)
    snap(0)
    while cur is not None and tree[cur]['value']!=target:
        snap(1,'true');smaller=target<tree[cur]['value'];snap(2,str(smaller).lower());cur=tree[cur]['left' if smaller else 'right'];snap(3 if smaller else 4)
    snap(1,'false');snap(5);return l.finish(cur,'B')


def backtracking():
    a=[1,2];path=[];out=[];stack=[]
    l=Lab(18,'Generate all subsets',{'a':a},'enter subsets(start);|out.add(new ArrayList<>(path));|i < a.length|path.add(a[i]);|subsets(i + 1);|path.remove(path.size() - 1);|i++;|return;')
    def snap(line,n=''):l.step(line,dict(start=stack[-1]['start'],i=stack[-1].get('i')),{'a':a,'path':path,'subsets':out,'call stack':stack},n)
    def visit(start):
        stack.append({'start':start,'i':start});snap(0);out.append(path.copy());snap(1,'Save a copy; later undo must not mutate saved subsets.')
        for i in range(start,len(a)):
            stack[-1]['i']=i;snap(2,'true');path.append(a[i]);snap(3);snap(4,'Enter a child call.');visit(i+1);path.pop();snap(5,'Undo the last choice.');stack[-1]['i']=i+1;snap(6)
        snap(2,'false');snap(7);stack.pop()
    visit(0);return l.finish(out,[[],[1],[1,2],[2]])


def constrained():
    n=4;cols=set();d1=set();d2=set();queens=[];stack=[];count=0
    l=Lab(19,'Count N-Queens solutions',{'n':n},'enter place(row);|row == n|count++;|return;|col < n|a = row + col; b = row - col + n - 1;|cols[col] || diag1[a] || diag2[b]|continue;|mark column and diagonals;|place(row + 1);|unmark column and diagonals;|col++;')
    def snap(line,note=''):l.step(line,dict(count=count,**stack[-1]),{'queens (row, col)':queens,'occupied columns':sorted(cols),'diagonal 1':sorted(d1),'diagonal 2':sorted(d2),'call stack':stack},note)
    def place(row):
        nonlocal count
        stack.append(dict(row=row,col=None,a=None,b=None));snap(0);snap(1,str(row==n).lower())
        if row==n:count+=1;snap(2,'Found a complete valid board.');snap(3);stack.pop();return
        for col in range(n):
            stack[-1]['col']=col;snap(4,'true');a=row+col;b=row-col+n-1;stack[-1].update(a=a,b=b);snap(5)
            conflict=col in cols or a in d1 or b in d2;snap(6,str(conflict).lower())
            if conflict:
                snap(7,'Prune this branch immediately.');stack[-1]['col']=col+1;snap(11);continue
            cols.add(col);d1.add(a);d2.add(b);queens.append([row,col]);snap(8);snap(9);place(row+1)
            cols.remove(col);d1.remove(a);d2.remove(b);queens.pop();snap(10,'Restore the parent state before trying the next column.')
            stack[-1]['col']=col+1;snap(11)
        stack[-1]['col']=n;snap(4,'false');snap(3);stack.pop()
    place(0);return l.finish(count,2)


def graph_bfs():
    graph=[[1,2],[0,3],[0],[1]];q=deque();visited=[False]*4;order=[];u=v=None
    l=Lab(20,'Breadth-first graph traversal',{'graph':graph,'start':0},'visited[start] = true;|queue.offer(start);|!queue.isEmpty()|u = queue.poll();|v = next neighbor of u;|visited[v]|continue;|visited[v] = true;|queue.offer(v);|traversal.add(u);|return traversal;')
    def snap(line,n=''):l.step(line,dict(u=u,v=v),{'adjacency':graph,'queue (front at left)':list(q),'visited':visited,'traversal':order},n)
    visited[0]=True;snap(0);q.append(0);snap(1)
    while q:
        snap(2,'true');u=q.popleft();snap(3);order.append(u);snap(9)
        for v in graph[u]:
            snap(4);snap(5,str(visited[v]).lower())
            if visited[v]:snap(6);continue
            visited[v]=True;snap(7);q.append(v);snap(8)
    snap(2,'false');snap(10);return l.finish(order,[0,1,2,3])


def topo():
    graph=[[1,2],[3],[3],[]];indegree=[0,1,1,2];q=deque();order=[];u=v=None;i=0
    l=Lab(21,'Kahn topological order',{'graph':graph},'calculate indegree of every vertex;|indegree[i] == 0|queue.offer(i);|!queue.isEmpty()|u = queue.poll();|order.add(u);|v = next dependent of u;|indegree[v]--;|indegree[v] == 0|queue.offer(v);|order.size() == n|return order;')
    def snap(line,n=''):l.step(line,dict(i=i,u=u,v=v,processed=len(order)),{'adjacency':graph,'indegree':indegree,'queue (front at left)':list(q),'order':order},n)
    snap(0)
    for i in range(4):
        snap(1,str(indegree[i]==0).lower())
        if indegree[i]==0:q.append(i);snap(2)
    while q:
        snap(3,'true');u=q.popleft();snap(4);order.append(u);snap(5)
        for v in graph[u]:
            snap(6);indegree[v]-=1;snap(7);snap(8,str(indegree[v]==0).lower())
            if indegree[v]==0:q.append(v);snap(9)
    snap(3,'false');snap(10,'true: no cycle');snap(11);return l.finish(order,[0,1,2,3])


def dsu():
    parent=list(range(4));size=[1]*4;edges=[[0,1],[2,3],[1,3],[0,3]];a=b=None
    l=Lab(22,'Union by size and path compression',{'edges':edges},'parent[i] = i; size[i] = 1;|a = find(edge[0]);|b = find(edge[1]);|parent[x] != x|parent[x] = find(parent[x]);|a == b|skip already connected edge;|size[a] < size[b]|swap(a, b);|parent[b] = a;|size[a] += size[b];|return parent;')
    def snap(line,n='',extra=None):l.step(line,dict(a=a,b=b,**(extra or {})),{'parent':parent,'size':size,'edges':edges},n)
    def find(x):
        snap(3,str(parent[x]!=x).lower(),{'x':x})
        if parent[x]!=x:parent[x]=find(parent[x]);snap(4,'Path compression points directly to the root.',{'x':x})
        return parent[x]
    snap(0)
    for edge in edges:
        a=find(edge[0]);snap(1);b=find(edge[1]);snap(2);snap(5,str(a==b).lower())
        if a==b:snap(6);continue
        snap(7,str(size[a]<size[b]).lower())
        if size[a]<size[b]:a,b=b,a;snap(8)
        parent[b]=a;snap(9);size[a]+=size[b];snap(10)
    snap(11);return l.finish(parent,[0,0,0,0])


def shortest():
    graph=[[[1,2],[2,5]],[[2,1]],[]];dist=[0,'∞','∞'];pq=[[0,0]];u=v=w=None;d=next_cost=None
    l=Lab(23,'Dijkstra shortest distances',{'graph (neighbor, weight)':graph,'source':0},'dist[source] = 0; heap.offer([0, source]);|!heap.isEmpty()|[d, u] = heap.poll();|d != dist[u]|continue;|[v, weight] = next edge;|next = dist[u] + weight;|next < dist[v]|dist[v] = next;|heap.offer([next, v]);|return dist;')
    def snap(line,n=''):l.step(line,dict(u=u,v=v,weight=w,d=d,next=next_cost),{'dist':dist,'min heap [distance,node]':pq,'adjacency [neighbor,weight]':graph},n)
    snap(0)
    while pq:
        snap(1,'true');d,u=heapq.heappop(pq);snap(2);snap(3,str(d!=dist[u]).lower())
        if d!=dist[u]:snap(4,'Stale heap entry: a better route was already found.');continue
        for v,w in graph[u]:
            snap(5);next_cost=dist[u]+w;snap(6);better=dist[v]=='∞' or next_cost<dist[v];snap(7,str(better).lower())
            if better:dist[v]=next_cost;snap(8);heapq.heappush(pq,[next_cost,v]);snap(9)
    snap(1,'false');snap(10);return l.finish(dist,[0,2,3])


def mst():
    edges=[[0,2,5],[0,1,1],[1,2,2]];parent=[0,1,2];chosen=[];cost=0;used=0;u=v=w=None
    l=Lab(24,'Kruskal minimum spanning tree',{'edges (u,v,weight)':edges},'sort edges by weight;|[u, v, weight] = next edge;|find(u) == find(v)|skip cycle edge;|parent[find(v)] = find(u);|cost += weight;|used++;|used == n - 1|return cost;')
    def find(x):
        while parent[x]!=x:x=parent[x]
        return x
    def snap(line,n=''):l.step(line,dict(u=u,v=v,weight=w,cost=cost,used=used),{'sorted edges':edges,'parent':parent,'chosen edges':chosen},n)
    edges.sort(key=lambda e:e[2]);snap(0)
    for u,v,w in edges:
        snap(1);same=find(u)==find(v);snap(2,str(same).lower())
        if same:snap(3);continue
        parent[find(v)]=find(u);chosen.append([u,v,w]);snap(4);cost+=w;snap(5);used+=1;snap(6);snap(7,str(used==2).lower())
    snap(8);return l.finish(cost,3)


def trie():
    words=['cat','car'];nodes={'root':{}};end=[];cur='root';word=None;c=None
    l=Lab(25,'Insert words into a prefix trie',{'words':words},'root = new Node();|word = next word;|cur = root;|c = next character;|cur.child[c] == null|cur.child[c] = new Node();|cur = cur.child[c];|cur.end = true;|return trie;')
    def snap(line,n=''):l.step(line,dict(word=word,c=c,cur=cur),{'trie edges':nodes,'terminal nodes':end},n)
    snap(0)
    for word in words:
        snap(1);cur='root';snap(2)
        for c in word:
            snap(3);missing=c not in nodes[cur];snap(4,str(missing).lower())
            if missing:
                name=(cur if cur!='root' else '')+c;nodes[cur][c]=name;nodes[name]={};snap(5)
            cur=nodes[cur][c];snap(6)
        end.append(cur);snap(7)
    snap(8);return l.finish(end,['cat','car'])


def bits():
    nums=[4,1,2,1,2];answer=0;x=None
    l=Lab(26,'Single number by XOR cancellation',{'nums':nums},'answer = 0;|x = next value;|answer ^= x;|return answer;')
    def snap(line,n=''):l.step(line,dict(x=x,answer=answer,binary=f'{answer:04b}'),{'nums':nums},n)
    snap(0)
    for x in nums:snap(1);answer^=x;snap(2,'Equal bit patterns cancel under XOR.')
    snap(3);return l.finish(answer,4)


def dp1():
    nums=[2,7,9,3,1];prev2=prev1=0;current=None;value=None;i=0;history=[]
    l=Lab(27,'House Robber rolling DP',{'nums':nums},'prev2 = 0; prev1 = 0;|value = next house;|current = Math.max(prev1, prev2 + value);|prev2 = prev1;|prev1 = current;|return prev1;')
    def snap(line,n=''):l.step(line,dict(i=i,value=value,prev2=prev2,prev1=prev1,current=current),{'nums':nums,'best per prefix':history},n)
    snap(0)
    for i,value in enumerate(nums):snap(1);current=max(prev1,prev2+value);snap(2,'Choose between skipping and taking this house.');prev2=prev1;snap(3);prev1=current;history.append(current);snap(4)
    snap(5);return l.finish(prev1,12)


def knapsack():
    nums=[1,5,11,5];target=11;dp=[False]*12;dp[0]=True;x=None;total=None
    l=Lab(28,'0/1 subset sum for equal partition',{'nums':nums,'target':target},'dp[0] = true;|x = next item;|sum = target;|sum >= x|dp[sum] = dp[sum] || dp[sum - x];|sum--;|return dp[target];')
    def snap(line,n=''):l.step(line,dict(x=x,sum=total,target=target),{'nums':nums,'dp (reachable sums)':dp},n)
    snap(0)
    for x in nums:
        snap(1);total=target;snap(2)
        while total>=x:
            snap(3,'true');dp[total]=dp[total] or dp[total-x];snap(4,'Descending sums prevent using this item twice.');total-=1;snap(5)
        snap(3,'false')
    snap(6);return l.finish(dp[target],True)


def grid():
    rows=3;cols=4;dp=[1]*cols;row=0;col=0;history=[dp.copy()]
    l=Lab(29,'Unique right/down grid paths',{'rows':rows,'cols':cols},'Arrays.fill(dp, 1);|row = 1;|row < rows|col = 1;|col < cols|dp[col] += dp[col - 1];|col++;|row++;|return dp[cols - 1];')
    def snap(line,n=''):l.step(line,dict(row=row,col=col,rows=rows,cols=cols),{'dp (current row)':dp,'completed rows':history},n)
    snap(0);row=1;snap(1)
    while row<rows:
        snap(2,'true');col=1;snap(3)
        while col<cols:snap(4,'true');dp[col]+=dp[col-1];snap(5,'Old dp[col] is from above; dp[col−1] is from the left.');col+=1;snap(6)
        snap(4,'false');history.append(dp.copy());row+=1;snap(7)
    snap(2,'false');snap(8);return l.finish(dp[-1],10)


def strings():
    a='abcde';b='ace';dp=[[0]*(len(b)+1) for _ in range(len(a)+1)];i=j=0
    l=Lab(30,'Longest common subsequence',{'a':a,'b':b},'dp = new int[a.length()+1][b.length()+1];|i = 1;|i <= a.length()|j = 1;|j <= b.length()|a.charAt(i-1) == b.charAt(j-1)|dp[i][j] = dp[i-1][j-1] + 1;|dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);|j++;|i++;|return dp[a.length()][b.length()];')
    def snap(line,n=''):l.step(line,dict(i=i,j=j,a_char=a[i-1] if 1<=i<=len(a) else None,b_char=b[j-1] if 1<=j<=len(b) else None),{'a':list(a),'b':list(b),'dp (empty-prefix row/column first)':dp},n)
    snap(0);i=1;snap(1)
    while i<=len(a):
        snap(2,'true');j=1;snap(3)
        while j<=len(b):
            snap(4,'true');match=a[i-1]==b[j-1];snap(5,str(match).lower())
            if match:dp[i][j]=dp[i-1][j-1]+1;snap(6)
            else:dp[i][j]=max(dp[i-1][j],dp[i][j-1]);snap(7)
            j+=1;snap(8)
        snap(4,'false');i+=1;snap(9)
    snap(2,'false');snap(10);return l.finish(dp[-1][-1],3)


GENERATORS=[sliding,two_pointers,fast_slow,binary,answer_search,frequency,prefix,difference,mono_stack,mono_queue,heap_lab,intervals,greedy,linked,tree_dfs,tree_bfs,bst,backtracking,constrained,graph_bfs,topo,dsu,shortest,mst,trie,bits,dp1,knapsack,grid,strings]


def generate():
    labs=[]
    for make in GENERATORS:
        lab=make()
        labs.append(dict(id=lab.id,title=lab.title,inputs=lab.inputs,code=lab.code,steps=lab.steps,result=lab.result))
    return labs


if __name__=='__main__':
    import pathlib
    data=generate()
    pathlib.Path(__file__).with_name('labs.json').write_text(json.dumps(data,ensure_ascii=False,separators=(',',':'))+'\n')
    print(f'Generated {len(data)} labs / {sum(len(l["steps"]) for l in data)} instruction snapshots; all results verified.')
