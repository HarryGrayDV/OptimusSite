class ChangeNameOfHashInModels < ActiveRecord::Migration[5.2]
  def change
    rename_column :models, :hash, :name
  end
end
