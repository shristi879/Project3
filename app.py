from flask import Flask, render_template
import pandas as pd

app = Flask(__name__)

# read csv file
df = pd.read_csv('clean_data.csv')

@app.route('/')
def index():
    return render_template('map.html')

@app.route('/data')
def get_data():
    # convert to JSON
    geojson = {
        "type": "FeatureCollection",
        "features": []
    }
    for _, row in df.iterrows():
        feature = {
            "type": "Feature",
            "properties": {
                "address": row['ADDRESS'],
                "price": row['PRICE'],
                "year": row['DATE_SOLD'],
                "land_area": row['LAND_AREA']
            },
            "geometry": {
                "type": "Point",
                "coordinates": [row['LONGITUDE'], row['LATITUDE']]
            }
        }
        geojson['features'].append(feature)
    return geojson

if __name__ == '__main__':
    app.run(debug=True)
