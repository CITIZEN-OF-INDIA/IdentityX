import pickle

with open("faces.pkl", "rb") as f:
    data = pickle.load(f)

print(type(data))
print(len(data))
print(data[0])