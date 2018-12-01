class Button < ApplicationRecord

  validates :position, presence: true
  validates :text, presence: true
  validates :age, presence: true
  validates :gender, presence: true
  validates :region, presence: true
  validates :ctd, presence: true
  validates_inclusion_of :mobile, in: [true, false]
  validates_inclusion_of :synthetic, in: [true, false]
end
