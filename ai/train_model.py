import random
import joblib
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from expiry_predictor import expiry_rules, normalize_food

# synth data
X = []
y = []
foods = list(expiry_rules.keys())

for _ in range(2000):
    food = random.choice(foods)
    base = expiry_rules[food]
    storage = random.choice(["room","fridge","hotbox"])
    temp = random.uniform(15, 40)
    # synthetic label: rules + noise + temp effect
    label = base
    if storage == "fridge":
        label *= 2
    if storage == "hotbox":
        label = int(label * 0.7)
    if temp < 20:
        label += 1
    elif temp > 30:
        label = max(1, label - 1)
    label = max(1, label + random.choice([-1, 0, 0, 1]))  # small noise
    storage_code = {"room": 0, "fridge": 1, "hotbox": 2}[storage]
    X.append([base, storage_code, temp])
    y.append(label)

X = np.array(X)
y = np.array(y)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X, y)
joblib.dump(model, "model.joblib")
print("Saved model.joblib")
