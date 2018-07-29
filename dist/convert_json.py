import csv
import json

csvfile = open('BlackFridayFiltered.csv', 'r')
jsonfile = open('BlackFridayFiltered.json', 'w')

fieldnames = ('User_ID','Product_ID','Gender','Age','City_Category','Marital_Status','Purchase')
reader = csv.DictReader( csvfile, fieldnames)
out = json.dumps( [ row for row in reader ] )
jsonfile.write(out)