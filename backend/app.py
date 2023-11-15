import os
from flask import Flask, jsonify, request;
from flask_sqlalchemy import SQLAlchemy;
import datetime; 
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_USERNAME = os.getenv('MYSQL_USERNAME')

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://root:{MYSQL_PASSWORD}@{MYSQL_USERNAME}/blogs"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

app.app_context().push()

class Blog(db.Model):
  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.Text())
  body = db.Column(db.Text())
  date = db.Column(db.DateTime, default = datetime.datetime.now)

  def __init__(self, title, body):
    self.title = title
    self.body = body

class ArticleSchema(ma.Schema):
  class Meta:
    fields = ('id', "title", "body", "date")

article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)

@app.route('/get', methods = ['GET'])
def get_articles():
  all_articles = Blog.query.all()
  results = articles_schema.dump(all_articles)
  return jsonify(results)

@app.route('/search/<keyword>', methods = ['GET'])
def search_article(keyword):
  matched_article = Blog.query.filter(db.func.CONCAT(' ', Blog.title, ' ') == f' {keyword} ').all()
  results = articles_schema.dump(matched_article)
  return jsonify(results)

@app.route('/get/<id>/', methods = ['GET'])
def get_article(id):
  article = Blog.query.get(id)
  return article_schema.jsonify(article)

@app.route('/add', methods = ['POST'])
def add_article():
  title = request.json["title"]
  body = request.json["body"]

  articles = Blog(title, body)
  db.session.add(articles)
  db.session.commit()
  return article_schema.jsonify(articles)

@app.route('/delete/<id>/', methods = ['DELETE'])
def delete_article(id):
  article = Blog.query.get(id)

  db.session.delete(article)
  db.session.commit()
  return article_schema.jsonify(article)

if __name__ == "__main__":  
  app.run(debug=True)
