import pandas as pd
import json
# df = pd.read_excel('mrt_station.xls')
df = pd.read_excel('taxi_stand.xls')
#df = df.drop(columns=['mrt_station_chinese', 'mrt_line_chinese'])
#df = df.rename(columns={"mrt_station_english": "MRT_station", "mrt_line_english": "MRT_line"})
#df['busStop_code'] = "a"
df.to_excel("output.xlsx")

# displaying the DataFrame
print(df)



