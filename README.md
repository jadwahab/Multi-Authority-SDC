# Multi-Authority-SDC

### Step I: Client Generating coins himself

### Diagram:

![Diagram](https://i.imgur.com/ycQoCbf.png)

### Current Client Interface:
![Interface](https://i.imgur.com/ylcVhHo.png)

### Diagram Steps Status:
- 1.generate_coin() - completed
- 2.get_signatures() - semi-complete (I have code for it in the 'src_old')
- 3.sign_coin() - completed
- 4.aggregate_signatures() - completed
- 5.randomize_aggregate() - completed
- 6.spend_coin() - not completed
- 7.verify_sig() - not completed

#### Questions:
- Does it matter if id is g1^id or g2^id?

#### TODOs:
- Re-integrate coin signing
- Re-integrate client aggregate
- Re-integrate communication between entitites 
- Client Merchant entity
