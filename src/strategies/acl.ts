export const roles = [
  {
    "group": "user",
    "permissions": [
      {
        "resource": "/whoAmI",
        "methods": ["POST", "GET", "PUT"],
      }
    ]
  },
  {
    "group": "admin",
    "permissions": [
      {
        "resource": "/*",
        "methods": ["POST", "GET", "PUT"],
      }
    ]
  }
]
