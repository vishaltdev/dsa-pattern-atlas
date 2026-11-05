"""Behavior and trace-integrity checks for instruction labs."""
import unittest
from labs import generate, sliding, linked, tree_dfs, mono_queue, heap_lab, strings


class TraceTests(unittest.TestCase):
    def test_all_patterns_have_complete_traces(self):
        labs=generate()  # Every generator also compares its result with a known answer.
        self.assertEqual([l['id'] for l in labs],list(range(1,31)))
        for lab in labs:
            self.assertGreater(len(lab['steps']),5)
            self.assertTrue(lab['steps'][-1]['structures'])
            for step in lab['steps']:
                self.assertIn(step['line'],range(len(lab['code'])))
                self.assertIsInstance(step['variables'],dict)

    def test_sliding_window_boundary_cases(self):
        for text,answer in [('',0),('a',1),('aaaa',1),('abba',2),('pwwkew',3),('abcdef',6)]:
            self.assertEqual(sliding(text).result,answer)

    def test_window_set_matches_actual_window_after_add(self):
        for text in ['abba','abcabcbb','bbbbb']:
            for step in sliding(text).steps:
                if step['line']==7:
                    v=step['variables'];window=text[v['left']:v['right']+1]
                    self.assertEqual(len(window),len(set(window)))
                    self.assertEqual(set(window),set(step['structures']['seen (HashSet)']))

    def test_saved_snapshots_do_not_mutate(self):
        lab=linked()
        self.assertEqual(lab.inputs['next'],{'A':'B','B':'C','C':None})
        self.assertEqual(lab.steps[0]['structures']['next pointers'],{'A':'B','B':'C','C':None})
        self.assertEqual(lab.steps[-1]['structures']['next pointers'],{'A':None,'B':'A','C':'B'})
        self.assertIsNot(lab.steps[0]['structures'],lab.steps[-1]['structures'])

    def test_recursive_call_returns_restore_parent(self):
        lab=tree_dfs()
        self.assertEqual(lab.result,3)
        self.assertTrue(any(len(s['structures']['call stack'])==4 for s in lab.steps))
        root=lab.steps[-1]['structures']['call stack']
        self.assertEqual(root,[{'node':'A','left':1,'right':2,'result':3}])

    def test_heap_property_at_every_recorded_step(self):
        for step in heap_lab().steps:
            heap=step['structures']['min heap (array layout)']
            for i in range(1,len(heap)):
                self.assertLessEqual(heap[(i-1)//2],heap[i])

    def test_deque_front_is_window_maximum_when_recorded(self):
        for step in mono_queue().steps:
            if step['line']==8:
                v=step['variables'];a=step['structures']['a']
                self.assertEqual(step['structures']['answer'][-1],max(a[v['left']:v['i']+1]))

    def test_lcs_only_writes_the_selected_dp_cell(self):
        lab=strings()
        for before,after in zip(lab.steps,lab.steps[1:]):
            a=before['structures']['dp (empty-prefix row/column first)']
            b=after['structures']['dp (empty-prefix row/column first)']
            changed=[(r,c) for r in range(len(a)) for c in range(len(a[r])) if a[r][c]!=b[r][c]]
            if changed:
                self.assertIn(after['line'],[6,7])
                self.assertEqual(changed,[(after['variables']['i'],after['variables']['j'])])


if __name__=='__main__':
    unittest.main()
