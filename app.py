import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

import datetime as dt


engine = create_engine("sqlite:///clean_date.sqlite")

Base = automap_base()

Base.prepare(engine, reflect=True)

