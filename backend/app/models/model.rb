class Model < ApplicationRecord
  validates :combination, presence: true

  scope :mobile, -> { where(mobile: true) }
  scope :web, -> { where(mobile: false) }
end
