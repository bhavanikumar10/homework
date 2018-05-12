import os
import csv
#from datetime import datetime
import datetime
import time

# setting the path for the csv file
pyboss_csvpath = os.path.join("raw_data","employee_data1.csv")
pyboss_csvpath2 = os.path.join("raw_data","employee_data2.csv")
output_path = os.path.join("raw_data","consolidated_employee_output_data.csv")



# opening the csvfile
with open(pyboss_csvpath,newline = "") as pyboss_csvfile:
    # reading through the csvfile"
    csvreader = csv.reader(pyboss_csvfile, delimiter = ",")
    #data = list(csv.reader(pyboss_csvfile))
    #print(data)

    for row in csvreader:
        person = {row[0]}
        first_name = row[1].split(" ")
        last_name = row[1].split(" ")
        a = row[2]
        print(a)
        #dateofbirth = time.strftime('%Y/%m/%d', time.strptime(row[2],'%Y-%m-%d'))
        #dateofbirth = datetime.datetime.strptime(row[2],'%Y-%m-%d').date()
        #print(dateofbirth)
        mylist = row[3]
        SSN = str.replace(row[3], 'xxx-xx-0000')
        print (SSN)
                
        #state = row[4]
        
        us_state_abbrev = {
            'Alabama': 'AL',
            'Alaska': 'AK',
            'Arizona': 'AZ',
            'Arkansas': 'AR',
            'California': 'CA',
            'Colorado': 'CO',
            'Connecticut': 'CT',
            'Delaware': 'DE',
            'Florida': 'FL',
            'Georgia': 'GA',
            'Hawaii': 'HI',
            'Idaho': 'ID',
            'Illinois': 'IL',
            'Indiana': 'IN',
            'Iowa': 'IA',
            'Kansas': 'KS',
            'Kentucky': 'KY',
            'Louisiana': 'LA',
            'Maine': 'ME',
            'Maryland': 'MD',
            'Massachusetts': 'MA',
            'Michigan': 'MI',
            'Minnesota': 'MN',
            'Mississippi': 'MS',
            'Missouri': 'MO',
            'Montana': 'MT',
            'Nebraska': 'NE',
            'Nevada': 'NV',
            'New Hampshire': 'NH',
            'New Jersey': 'NJ',
            'New Mexico': 'NM',
            'New York': 'NY',
            'North Carolina': 'NC',
            'North Dakota': 'ND',
            'Ohio': 'OH',
            'Oklahoma': 'OK',
            'Oregon': 'OR',
            'Pennsylvania': 'PA',
            'Rhode Island': 'RI',
            'South Carolina': 'SC',
            'South Dakota': 'SD',
            'Tennessee': 'TN',
            'Texas': 'TX',
            'Utah': 'UT',
            'Vermont': 'VT',
            'Virginia': 'VA',
            'Washington': 'WA',
            'West Virginia': 'WV',
            'Wisconsin': 'WI',
            'Wyoming': 'WY',
        }
        
        for key in us_state_abbrev:
            print(state)
    

        with open(output_path, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(["Emp Id", "Name","DOB","SSN","State"])
            for row in csvreader:
                cleaned_csv = zip("Emp Id", "first_name", "last_name","a","SSN","state")
                writer.writerow("Emp Id", "First Name","Last Name", "Date_of_Birth", "SSN", "State")
                writer.writerows(cleaned_csv)
                #print(csvreader)
                print(row)