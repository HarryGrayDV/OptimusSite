class UpdateButtons < ActiveRecord::Migration[5.2]
  def change
    change_column :buttons, :created_at, :datetime, null: true
    change_column :buttons, :updated_at, :datetime, null: true
    add_column :buttons, :synthetic, :boolean
  end
end
