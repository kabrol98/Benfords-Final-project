import csv
import json

infile = open('BlackFriday.csv', 'r')
outfile = open('BlackFridayFiltered.csv', 'w')

lines = infile.readlines()

for line in lines[:5000]:
  outfile.write(line)
  pass
infile.close()
outfile.close()