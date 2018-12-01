class Button < ApplicationRecord

  validates :text, presence: true
  validates :colour_h, presence: true
  validates :colour_s, presence: true
  validates :colour_l, presence: true
  validates :width, presence: true
  validates :height, presence: true
  validates :position, presence: true
  validates :click_through_delta, presence: true
end
