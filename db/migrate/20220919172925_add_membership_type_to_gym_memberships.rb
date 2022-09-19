class AddMembershipTypeToGymMemberships < ActiveRecord::Migration[6.1]
  def change
    add_column :gym_memberships, :membershipType,
    :string
  end
end
