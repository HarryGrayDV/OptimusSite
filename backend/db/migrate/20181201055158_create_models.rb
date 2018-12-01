class CreateModels < ActiveRecord::Migration[5.2]
  def change
    create_table :models do |t|
      t.jsonb :combination
    end
  end
end
