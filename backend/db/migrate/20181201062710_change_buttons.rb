class ChangeButtons < ActiveRecord::Migration[5.2]
  def change
    remove_column :buttons, :gender, :string
    remove_column :buttons, :region, :string

    add_column :buttons, :gender, :integer
    add_column :buttons, :region, :integer
  end
end
