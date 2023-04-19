# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.create(
  name: "Tony Stark",
  email: "tony@stark.com"
)
Task.create(
  title: "Fix Jarvis",
  description: "GPS is not working for Jarvis",
  priority: :high,
  status: :inProgress,
  user: User.find_by_name("Tony Stark")
)
