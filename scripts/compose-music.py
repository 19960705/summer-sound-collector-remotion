#!/usr/bin/env python3
"""Deterministic original cue: Letters in October, 72 BPM, C major, 3/4."""
import json, random
from pathlib import Path
rng=random.Random(72768)
beat=60/72
bar=beat*3
notes=[]
def add(at,duration,pitch,velocity,part):
    at=max(0.0,at+rng.uniform(-.009,.009))
    notes.append(dict(at=round(at,5),duration=round(duration,5),pitch=pitch,velocity=max(1,min(127,velocity+rng.randrange(-3,4))),part=part))
# Cmaj7, Am7, Fmaj7, G6, Em7, Am7, Fmaj7, G7, Fmaj7, Fm6, Cmaj7, G7, Cmaj7, C(add9).
chords=[[48,55,60,64,71],[45,52,57,60,67],[41,48,53,57,64],[43,50,55,59,64],[40,47,52,55,62],[45,52,57,60,67],[41,48,53,57,64],[43,50,55,59,65],[41,48,53,57,64],[41,48,53,56,62],[48,55,60,64,71],[43,50,55,59,65],[48,55,60,64,67],[48,55,60,62,64]]
melodies=[[76,79,81,79],[72,76,79,76],[77,81,84,81],[79,76,74,71],[76,79,83,79],[81,79,76,72],[77,79,81,84],[83,81,79,74],[81,79,77],[80,77,74],[76,79,81,79],[74,77,79,71],[76,79,74,72],[72]]
for b,chord in enumerate(chords):
    start=.12+b*bar
    quiet=b in [8,9,13]
    add(start,2.05 if not quiet else 2.7,chord[0],49 if not quiet else 41,0)
    for j,offset in enumerate([0,.75,1.5,2.25]):
        if quiet and j in [1,3]:continue
        add(start+offset*beat,.68 if not quiet else 1.3,chord[2+j%3],44 if not quiet else 37,0)
    # A two-bar rising-third motif, varied and then recalled at the return.
    positions=[0,1,1.5,2] if len(melodies[b])==4 else ([0,1,2] if len(melodies[b])==3 else [0])
    for j,(offset,pitch) in enumerate(zip(positions,melodies[b])):
        part=1 if 3<=b<=7 or 10<=b<=12 else 0
        add(start+offset*beat+.04,beat*(.8 if j<3 else .95),pitch,64 if not quiet else 51,part)
    if 3<=b<=7 or 10<=b<=11:
        for j,offset in enumerate([.5,1.5,2.5]):add(start+offset*beat,.24,chord[1]+12,40+j*2,2)
    if b in [2,4,6,10,12]:
        for pitch in chord[2:4]:add(start+.08,bar*1.75,pitch,34,3)
# A soft final chord at 32.62s; the last ~3 seconds are release and room decay.
for pitch in [48,55,60,64,74]:add(32.62,1.9,pitch,41,0)
notes.sort(key=lambda n:n['at'])
Path('music').mkdir(exist_ok=True)
Path('music/letters-in-october.score.json').write_text(json.dumps({'title':'Letters in October','duration':37.1,'tempo':72,'meter':'3/4','notes':notes},indent=2)+'\n')
print('Composed',len(notes),'notes')
