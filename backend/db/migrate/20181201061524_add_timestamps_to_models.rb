class AddTimestampsToModels < ActiveRecord::Migration[5.2]
  def change
    add_column :models, :created_at, :datetime, null: false
    add_column :models, :updated_at, :datetime, null: false
  end
end
