class Button < ApplicationRecord

  validates :position, presence: true
  validates :text, presence: true
  validates :mobile, presence: true
  validates :age, presence: true
  validates :gender, presence: true
  validates :region, presence: true
  validates :ctd, presence: true
  validates :synthetic, presence: true
end
