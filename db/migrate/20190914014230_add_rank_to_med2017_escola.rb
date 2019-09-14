class AddRankToMed2017Escola < ActiveRecord::Migration[5.2]
  def change
    add_column :med2017_escolas, :rank, :integer
  end
end
