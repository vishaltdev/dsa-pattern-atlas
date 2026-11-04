"""Validate and package the dependency-free atlas for GitHub Pages."""
import json, pathlib, shutil
root = pathlib.Path(__file__).parent
patterns = json.loads((root / 'patterns.json').read_text())
assert len(patterns) == 30
assert sum(len(p['problems']) for p in patterns) == 180
assert len({p['name'] for p in patterns}) == 30
for p in patterns:
    assert len(p['problems']) == 6
    for key in ['when', 'naive', 'why', 'example', 'code', 'mistake', 'cost', 'diagram']:
        assert p[key], (p['name'], key)
    for problem in p['problems']:
        assert problem['id'] > 0 and problem['slug']
out = root / 'dist'
out.mkdir(exist_ok=True)
for name in ['index.html', 'style.css', 'app.js', 'patterns.json']:
    shutil.copyfile(root / name, out / name)
(out / '.nojekyll').touch()
print('Built dist/: 30 patterns, 180 roadmap entries, all required lesson fields validated.')
