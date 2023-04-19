class Task < ApplicationRecord
  enum :priority, [:high, :normal, :low]
  enum :status, [:todo, :inProgress, :completed]
  belongs_to :user
end
