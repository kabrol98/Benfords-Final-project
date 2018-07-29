import csv
import json

csvfile = open('census-state-populations.csv', 'r')
jsonfile = open('census-state-populations.json', 'w')

fieldnames = ('User_ID','Product_ID','Gender','Age','Occupation','City_Category','Stay_In_Current_City_Years','Marital_Status','Product_Category_1','Product_Category_2','Product_Category_3','Purchase'
)
reader = csv.DictReader( csvfile, fieldnames)
out = json.dumps( [ row for row in reader ] )
jsonfile.write(out)