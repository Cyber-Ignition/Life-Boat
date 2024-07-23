import json

f = open("drugs.json")

data = json.loads(f.read())
i = 0

while True:
    try:
        with open("drugs.txt", "a") as file:
            file.write(data["results"][i]["products"][0]["active_ingredients"][0]["name"] + "\n")
        i += 1
    except:
        break
        

