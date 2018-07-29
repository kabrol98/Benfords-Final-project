import csv
import json

csvfile = open('AppStoreData/AppleStore.csv', 'r')
jsonfile = open('AppleStore.json', 'w')

fieldnames = ("","id","track_name","size_bytes","currency","price","rating_count_tot","rating_count_ver","user_rating","user_rating_ver","ver","cont_rating","prime_genre","sup_devices.num","ipadSc_urls.num","lang.num","vpp_lic")
reader = csv.DictReader( csvfile, fieldnames)
out = json.dumps( [ row for row in reader ] )
jsonfile.write(out)