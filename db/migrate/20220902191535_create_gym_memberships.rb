class CreateGymMemberships < ActiveRecord::Migration[6.1]
  def change
    create_table :gym_memberships do |t|
      t.integer :price

      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :gym, null: false, foreign_key: true

      t.timestamps
    end
  end
end
