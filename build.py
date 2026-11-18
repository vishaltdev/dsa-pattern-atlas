"""Validate and package the dependency-free atlas for GitHub Pages."""
import json, pathlib, shutil, subprocess
from labs import generate
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
labs = generate()
assert [lab['id'] for lab in labs] == list(range(1, 31))
for lab in labs:
    assert len(lab['steps']) > 1
    for state in lab['steps']:
        assert 0 <= state['line'] < len(lab['code'])
        assert isinstance(state['variables'], dict)
(out / 'labs.json').write_text(json.dumps(labs, ensure_ascii=False, separators=(',', ':')))
for name in ['index.html', 'style.css', 'app.js', 'lab-ui.js', 'patterns.json']:
    shutil.copyfile(root / name, out / name)
# Ship the browser-local Java visualizer beside the pattern atlas.
studio = root / 'dsa-step-studio'
subprocess.run(['node', '--test', *[str(p) for p in sorted((studio / 'tests').glob('*.test.mjs'))]], check=True)
shutil.copytree(studio / 'docs', out / 'dsa-step-studio', dirs_exist_ok=True)
# Require conceptual teaching and valid cross-lesson links before publishing.
study_lessons = json.loads((root / 'staff-study' / 'lessons.json').read_text())
study_deep = json.loads((root / 'staff-study' / 'deep.json').read_text())
assert {lesson['id'] for lesson in study_lessons} == set(study_deep)
for lesson_id, lesson in study_deep.items():
    assert len(lesson['chapters']) >= 5, lesson_id
    assert len(lesson['scenarios']) == 2, lesson_id
    assert all(len(scenario['steps']) >= 4 for scenario in lesson['scenarios']), lesson_id
    assert all(link['target'] in study_deep for link in lesson['connections'] if link['target']), lesson_id
shutil.copytree(root / 'staff-study', out / 'staff-study', dirs_exist_ok=True, ignore=shutil.ignore_patterns('*.py', '__pycache__'))
(out / '.nojekyll').touch()
print('Built dist/: 30 patterns, 180 roadmap entries, all required lesson fields validated.')
print(f"Verified 30 algorithm results and {sum(len(lab['steps']) for lab in labs)} instruction snapshots.")

