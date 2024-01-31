from flask import Flask, request, jsonify

#import function from chatbot, will contain responses chatbot will use

app = Flask(__name__)

@app.post("/")
def responding():
    user_input = request.get_json().get("message")
    #response = | will depend on our chatbot functions
    reply = {"answer": reponse}
    return jsonify(message) 

if __name == '__main__':
    app.run(debug = True)