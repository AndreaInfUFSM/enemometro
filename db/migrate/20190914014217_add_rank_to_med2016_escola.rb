class AddRankToMed2016Escola < ActiveRecord::Migration[5.2]
  def change
    add_column :med2016_escolas, :rank, :integer
  end
end
