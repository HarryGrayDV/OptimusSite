class ChangeTimestampDefaultForModels < ActiveRecord::Migration[5.2]
  def change
    change_column :models, :created_at, :datetime, null: true
    change_column :models, :updated_at, :datetime, null: true
  end
end
