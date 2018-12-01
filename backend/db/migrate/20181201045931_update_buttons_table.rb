class UpdateButtonsTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :buttons, :colour_h, :integer
    remove_column :buttons, :colour_s, :integer
    remove_column :buttons, :colour_l, :integer
    remove_column :buttons, :width, :integer
    remove_column :buttons, :height, :integer

    add_column :buttons, :mobile, :boolean
    add_column :buttons, :age, :integer
    add_column :buttons, :gender, :string
    add_column :buttons, :region, :string
  end
end
