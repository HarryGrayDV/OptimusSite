class AddDefaultForSyntheticButtonsAttribute < ActiveRecord::Migration[5.2]
  def change
    change_column :buttons, :synthetic, default: false
  end
end
