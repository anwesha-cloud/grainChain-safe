from expiry_predictor import predict_safe_till

# Defaults (room storage, no temp given)
print(predict_safe_till("veg biryani", "2025-09-21T10:00:00"))
print(predict_safe_till("bread", "2025-09-21 15:30"))
print(predict_safe_till("laddoo", "2025-09-21T09:00"))
print(predict_safe_till("unknown food", "2025-09-21T09:00"))

# With storage conditions
print(predict_safe_till("rice", "2025-09-21T10:00:00", storage="fridge"))
print(predict_safe_till("samosa", "2025-09-21T12:00:00", storage="hotbox"))

# With temperature factor
print(predict_safe_till("dal", "2025-09-21T14:00:00", temperature=18))
print(predict_safe_till("curd", "2025-09-21T14:00:00", temperature=35))

# With both storage + temperature
print(predict_safe_till("paneer curry", "2025-09-21T13:00:00", storage="fridge", temperature=22))
