class CreateTrainers < ActiveRecord::Migration[6.1]
  def change
    create_table :trainers do |t|
      t.string :name
      t.text :bio
      t.string :email
      t.belongs_to :gym, null: false, foreign_key: true

      t.timestamps
    end
  end
end
