# Import the necessary libraries
import numpy as np
import pandas as pd
from flask import Flask
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from flask import Flask, jsonify
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

# Create a SQLAlchemy engine using the SQLite file
engine = create_engine('sqlite:///Resources/housing.db')

# Reflect the existing database into a new model
Base.metadata.reflect(engine)

# Define the model for the table
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

class Housing(Base):
    __tablename__ = 'mytable'
    ID = Column(Integer, primary_key=True)
    ADDRESS = Column(String)
    SUBURB = Column(String)
    PRICE = Column(Integer)
    BEDROOMS = Column(Integer)
    BATHROOMS = Column(Integer)
    LAND_AREA = Column(Integer)
    CBD_DIST = Column(Integer)
    NEAREST_STN = Column(String)
    NEAREST_STN_DIST = Column(Integer)
    DATE_SOLD = Column(String)
    POSTCODE = Column(String)
    LATITUDE = Column(Float)
    LONGITUDE = Column(Float)
    NEAREST_SCH = Column(Integer)



# Create the Flask app
app = Flask(__name__)
CORS(app)

# Define the routes
@app.route("/")
def welcome():
    """List all available api routes."""
    return(
        f"<h1>Housing price in Perth<h1>"
        f"<h2>Here you can get the hyperlinked routes list click the link to see the pages:<h2>"
        f"<ol><li><a href=http://127.0.0.1:5000/api/v1.0/yearandprice>"
        f"List of price, date_sold, land_area and suburb </a></li><br/><br/>"
        f"<li><a href=http://127.0.0.1:5000/api/v1.0/coordinate>"
        f"List of coordinate for map</a></li><br/><br/>"
    )

@app.route("/api/v1.0/yearandprice")
def price():
    session = Session(bind=engine)

    results = session.query(Housing.PRICE, Housing.DATE_SOLD, Housing.LAND_AREA, Housing.SUBURB).all()
    session.close()

    # Convert each Row to a dictionary using .asdict()
    results_dict = [r._asdict() for r in results]

    return jsonify(results_dict)

@app.route("/api/v1.0/coordinate")
def coordinate():
    session = Session(bind=engine)

    results = session.query(Housing.LATITUDE, Housing.LONGITUDE, Housing.ADDRESS, Housing.PRICE).all()
    session.close()

    # Convert each row to a dictionary using .asdict()
    results_dict = [r._asdict() for r in results]

    return jsonify(results_dict)

# Run the app
if __name__ == '__main__':
    app.run()