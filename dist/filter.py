import csv
import json

infile = open('census-state-populations.csv', 'r')
outfile = open('census-state-populations.csv', 'w')

lines = infile.readlines()

for line in lines[:5000]:
  outfile.write(line)
  pass
infile.close()
outfile.close()