from expiry_predictor import predict_safe_till

print(predict_safe_till("veg biryani", "2025-09-21T10:00:00"))
print(predict_safe_till("bread", "2025-09-21 15:30"))
print(predict_safe_till("laddoo", "2025-09-21T09:00"))
print(predict_safe_till("unknown food", "2025-09-21T09:00"))
