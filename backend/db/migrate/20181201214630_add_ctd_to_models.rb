class AddCtdToModels < ActiveRecord::Migration[5.2]
  def change
    add_column :models, :ctd, :integer
  end
end
