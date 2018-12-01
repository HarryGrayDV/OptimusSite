class UpdateModels < ActiveRecord::Migration[5.2]
  def change
    add_column :models, :mobile, :boolean
  end
end
