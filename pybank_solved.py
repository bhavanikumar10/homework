import os
import csv


# setting the path for the csv file
pybank_csvpath = os.path.join("raw_data","budget_data_1.csv")
pybank_csvpath1 = os.path.join("raw_data","budget_data_2.csv")
output_path = os.path.join("raw_data","consolidated_budget_data.csv")
        

# opening the csvfile
with open(pybank_csvpath,newline = "") as pybank_csvfile:
    # reading through the csvfile"
    csvreader = csv.reader(pybank_csvfile, delimiter = ",")
    #csvwriter = csv.writer(output_path [, dialect='csv'])
    for row in csvreader:
        total_months = []
        total_revenue = []
        counter = 0
        revenue_count = 0
        
        with open(output_path, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(["Date", "Revenue"])
            for row in csvreader:
                writer.writerow(row)
                #print(csvreader)
                print(row) 
                counter += 1
                month_count = counter
                total_revenue = row[1]
                print(total_revenue)
                #revenue_count = [sum(total_amount)) for total_amount in total_revenue]
                #print(revenue_count)
                #revenue_count = revenue_count + total_revenue
                #revenue_change = mean(total_revenue)
                greatest_revenue_increase = max(total_revenue)
                #greatest_revenue_decrease = min(total_revenue)
                total_revenue = total_revenue + str(revenue_count)
                             
        print("Financial Analysis")
        print("----" * 25)
            
        print("Total number of months included in the dataset is : " + "" + str(month_count))

        print("Total amount of revenue gained over the period is : " + "" + str(revenue_count))

        #print("Average revenue change : " + "" + str(revenue_change))

        print("Greatest increase in revenue : " + "" + str(greatest_revenue_increase))

        #print("Greatest Decrease in revenue : " + "" + str(greatest_revenue_decrease))


    
                

  