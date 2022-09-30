class AddImageUrlToTrainers < ActiveRecord::Migration[6.1]
  def change
    add_column :trainers, :image_url,
    :string
  end
end
