class CreateButtons < ActiveRecord::Migration[5.2]
  def change
    create_table :buttons do |t|
      t.string :text
      t.integer :colour_h
      t.integer :colour_s
      t.integer :colour_l
      t.integer :width
      t.integer :height
      t.integer :position
      t.integer :click_through_delta

      t.timestamps
    end
  end
end
