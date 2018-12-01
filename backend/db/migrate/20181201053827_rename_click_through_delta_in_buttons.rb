class RenameClickThroughDeltaInButtons < ActiveRecord::Migration[5.2]
  def change
    rename_column :buttons, :click_through_delta, :ctd
  end
end
