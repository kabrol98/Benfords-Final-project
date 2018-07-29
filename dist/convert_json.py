import csv
import json

csvfile = open('census-state-populations.csv', 'r')
jsonfile = open('census-state-populations.json', 'w')

fieldnames = ('state','pop_est_2014'
)
reader = csv.DictReader( csvfile, fieldnames)
out = json.dumps( [ row for row in reader ] )
jsonfile.write(out)