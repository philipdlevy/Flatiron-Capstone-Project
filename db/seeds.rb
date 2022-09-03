
# userRole = Role.create(id: 1, name: "user")
# adminRole = Role.create(id: 2, name: "admin")

user = User.create(username: "whatever", role_id: 1)

admin = User.create(username: "joe", role_id: 2)



# review1 = Review.create(title: "It's a review", body: "Lots of stuff goes here", rating: 3, item_id: 9, user_id: 1)
