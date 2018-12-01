class AddHashToModels < ActiveRecord::Migration[5.2]
  def change
    add_column :models, :hash, :string
  end
end
