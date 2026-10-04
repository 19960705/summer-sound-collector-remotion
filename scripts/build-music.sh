#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p out public/audio
python3 scripts/compose-music.py
swift scripts/render-music.swift music/letters-in-october.score.json out/letters-in-october-raw.wav
ffmpeg -hide_banner -loglevel error -y -i out/letters-in-october-raw.wav \
  -af 'highpass=f=55,lowpass=f=9500,loudnorm=I=-18:TP=-2:LRA=7,afade=t=in:st=0:d=0.12,afade=t=out:st=35:d=2.1' \
  -ar 44100 -ac 2 -c:a pcm_s24le -t 37.1 out/letters-in-october-master.wav
ffmpeg -hide_banner -loglevel error -y -i out/letters-in-october-master.wav -c:a aac -b:a 256k public/audio/letters-in-october.m4a
